import { Users } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent } from '~/components/ui/card';
import type { FitnessGoal } from '~/constants/enums/fitness.enum';
import type { Gender } from '~/constants/enums/genders.enum';
import { getInitials } from '~/lib/utils/string.utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

export interface Friend {
  id: string;
  name: string;
  gender: Gender;
  weight: number | undefined;
  height: number | undefined;
  fitnessGoal: FitnessGoal | undefined;
}

interface FriendListProps {
  friends: Friend[];
  title?: string;
  emptyMessage?: string;
  friendRequestLength?: number;
}

export function FriendList({
  friends,
  title = 'Friends',
  emptyMessage = 'No friends found',
  friendRequestLength = 0,
}: FriendListProps) {
  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Link to="/friends/requests">
            <Button variant="outline" className="cursor-pointer">
              <Users className="w-4 h-4" />
              Friend Requests
              {friendRequestLength > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {friendRequestLength}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
        <Link to="/friends/add">
          <Button className="cursor-pointer">Add Friend</Button>
        </Link>
      </div>

      {friends.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">{emptyMessage}</div>
      ) : (
        <div className="space-y-4 w-full">
          {friends.map((friend) => (
            <Card key={friend.id} className="w-full">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(friend.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        <Link to={`/profile/${friend.id}`}>{friend.name}</Link>
                      </h3>
                      <Badge variant="outline">{friend.gender}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Weight:</span>
                        <span>{friend.weight ? `${friend.weight} kg` : 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Height:</span>
                        <span>{friend.height ? `${friend.height} cm` : 'Not specified'}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2 mt-1">
                        <span className="text-muted-foreground">Goal:</span>
                        <span className="font-medium">{friend.fitnessGoal || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

