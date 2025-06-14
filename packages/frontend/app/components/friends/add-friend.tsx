import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface AddFriendProps {
  onSubmit: (friendIdentifier: string) => void;
}

export function AddFriend({ onSubmit }: AddFriendProps) {
  const [formData, setFormData] = useState({
    friendIdentifier: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.friendIdentifier.trim()) {
      newErrors.friendIdentifier = 'Username or email is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData.friendIdentifier.trim());
      setFormData({ friendIdentifier: '' });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add Friend</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="friend-identifier">Username *</Label>
              <Input
                id="friend-identifier"
                type="text"
                value={formData.friendIdentifier}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev) => ({ ...prev, friendIdentifier: e.target.value }))
                }
                placeholder="Enter username"
                className={errors.friendIdentifier ? 'border-red-500' : ''}
              />
              {errors.friendIdentifier && (
                <p className="text-sm text-red-500">{errors.friendIdentifier}</p>
              )}
            </div>
          </div>
          <CardFooter className="flex justify-end">
            <Button type="submit">Add Friend</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

