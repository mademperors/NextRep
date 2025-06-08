import { Controller } from "@nestjs/common";
import { MembersRepository } from "./member.repository";

@Controller()
export class MembersController {
    constructor(private readonly membersRepository: MembersRepository) {}
}