import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';
import { Role } from 'src/common/constants/enums/roles.enum';
import { encodePassword } from 'src/common/utils/bcrypt';
import { Account } from 'src/database/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  // Find any account (Member or Admin) by username
  async findByUsername(username: string): Promise<Account> {
    return await this.accountRepository.findOneOrFail({
      where: { username },
    });
  }

  // Get credentials for authentication (works for both Member and Admin)
  async getCredentials(username: string): Promise<Account | null> {
    return await this.accountRepository.findOne({
      where: { username },
      select: ['username', 'password', 'accountType'], // Include account_type to know which type it is
    });
  }

  // Find account with type checking
  async findWithType(username: string): Promise<{ account: Account; type: Role } | null> {
    const account = await this.accountRepository.findOne({
      where: { username },
    });

    if (!account) return null;

    return {
      account,
      type: account.accountType, // This will be Role.MEMBER or Role.ADMIN
    };
  }

  // Check if account exists
  async exists(username: string): Promise<boolean> {
    const count = await this.accountRepository.count({
      where: { username },
    });
    return count > 0;
  }

  // Find all accounts of a specific type
  async findByType(type: Role): Promise<Account[]> {
    return await this.accountRepository.find({
      where: { accountType: type },
    });
  }

  // For relations - find account for foreign key references
  async findForRelation(username: string): Promise<Account> {
    return await this.accountRepository.findOneOrFail({
      where: { username },
      select: ['username', 'accountType'], // Minimal select for relations
    });
  }

  // Delete any account (will cascade to Member/Admin specific data)
  async delete(username: string): Promise<void> {
    const result = await this.accountRepository.delete({ username });
    if (result.affected === 0) {
      throw new NotFoundException('Account not found');
    }
  }

  async canCreateChallengeType(username: string, challengeType: ChallengeType): Promise<boolean> {
    const account = await this.findForRelation(username);

    if (account.accountType === Role.ADMIN) {
      return true;
    }

    if (account.accountType === Role.MEMBER) {
      return challengeType === ChallengeType.PRIVATE;
    }

    return false;
  }

  async canEnrollInChallenges(username: string): Promise<boolean> {
    const account = await this.findForRelation(username);
    return account.accountType === Role.MEMBER; // Only members can enroll
  }

  // Check if account owns a specific challenge (for ownership validation)
  async isAccountChallengeOwner(
    username: string,
    challengeCreatorUsername: string,
  ): Promise<boolean> {
    return username === challengeCreatorUsername;
  }

  async getChallengePermissions(username: string): Promise<{
    canCreatePrivate: boolean;
    canCreateGlobal: boolean;
    canEnroll: boolean;
    canManageAny: boolean;
    accountType: Role;
  }> {
    const account = await this.findForRelation(username);

    const isAdmin = account.accountType === Role.ADMIN;
    const isMember = account.accountType === Role.MEMBER;

    return {
      canCreatePrivate: isAdmin || isMember,
      canCreateGlobal: isAdmin,
      canEnroll: isMember,
      canManageAny: isAdmin, // Admins can manage any challenge
      accountType: account.accountType,
    };
  }

  async validateChallengeCreation(
    username: string,
    challengeType: ChallengeType,
  ): Promise<Account> {
    const account = await this.findForRelation(username);
    const canCreate = await this.canCreateChallengeType(username, challengeType);

    if (!canCreate) {
      const typeStr = challengeType === ChallengeType.GLOBAL ? 'global' : 'private';
      throw new ForbiddenException(
        `Account type ${account.accountType} cannot create ${typeStr} challenges`,
      );
    }

    return account;
  }

  async validateEnrollment(username: string): Promise<Account> {
    const account = await this.findForRelation(username);
    const canEnroll = await this.canEnrollInChallenges(username);

    if (!canEnroll) {
      throw new ForbiddenException('Only members can enroll in challenges');
    }

    return account;
  }

  // Validate account type for specific operations
  async validateAccountType(username: string, expectedType: Role): Promise<Account> {
    const account = await this.findByUsername(username);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.accountType !== expectedType) {
      throw new ForbiddenException(`Operation requires ${expectedType} account`);
    }

    return account;
  }

  async create(username: string, password: string, accountType: Role): Promise<Account> {
    // Check if username already exists
    const exists = await this.exists(username);
    if (exists) {
      throw new ConflictException('Username already exists');
    }

    const account = this.accountRepository.create({
      username,
      password: encodePassword(password),
      accountType,
    });

    return await this.accountRepository.save(account);
  }
}
