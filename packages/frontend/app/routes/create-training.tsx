import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { createTraining } from '~/api/trainings';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

interface CreateTrainingPageProps {
  isOpen: boolean;
  onCreateTraining: (formData: any) => void;
}

export default function CreateTrainingPage() {
  const navigate = useNavigate();
  const { mutate: onCreateTraining } = useMutation({
    mutationFn: (formData: any) =>
      createTraining({
        title: formData.name,
        training_info: formData.description,
      }),
    onSuccess: () => {
      toast.success('Training created successfully');
      navigate('/challenges');
    },
    onError: () => {
      toast.error('Failed to create training');
    },
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Training name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Training description is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onCreateTraining(formData);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Training</CardTitle>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="training-name">Training Name *</Label>
                <Input
                  id="training-name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter training name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="training-description">Description *</Label>
                <Textarea
                  id="training-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Describe the training..."
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
            </div>
            <CardFooter className="flex justify-end">
              <Button type="submit">Create Training</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

