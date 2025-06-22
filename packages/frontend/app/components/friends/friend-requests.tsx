import { Check, Users, X } from 'lucide-react';
import type { FriendRequest } from '~/api/friends';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { getInitials } from '~/lib/utils/string.utils';

interface FriendRequestsPageProps {
  requests: FriendRequest[];
  handleAccept: (requestId: number) => void;
  handleDecline: (requestId: number) => void;
}

export default function FriendRequestsPage({
  requests = [],
  handleAccept,
  handleDecline,
}: FriendRequestsPageProps) {
  if (requests.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle>No Friend Requests</CardTitle>
            <CardDescription>
              You don't have any pending friend requests at the moment.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Friend Requests</h1>
        <p className="text-muted-foreground">
          You have {requests.length} pending friend request
          {requests.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(request.senderUsername)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{request.senderUsername}</p>
                    <p className="text-sm text-muted-foreground">wants to be your friend</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecline(request.id)}
                    className="bg-background text-foreground hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Decline</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAccept(request.id)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span className="sr-only">Accept</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

