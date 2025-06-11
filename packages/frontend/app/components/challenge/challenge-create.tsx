import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { createChallenge } from '~/api/challenges';
import { getTrainings } from '~/api/trainings';
import { ChallengeType } from '~/constants/enums/challenge-type.enum';
import { InteractiveCalendar } from '../interactive-calendar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const createChallengeSchema = z.object({
  name: z.string().min(1, 'Challenge name is required'),
  length: z
    .number()
    .min(1, 'Length must be at least 1 day')
    .max(365, 'Length cannot exceed 365 days'),
  challengeInfo: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  visibility: z.nativeEnum(ChallengeType),
  creator: z.string().min(1),
  trainingIds: z.array(z.number().optional()).optional(),
  dayTrainings: z
    .array(
      z.object({
        day: z.number(),
        training: z.any().optional(),
      }),
    )
    .optional(),
});
type CreateChallenge = z.infer<typeof createChallengeSchema>;

const createChallengeDtoSchema = z.object({
  challengeInfo: z.string().min(1, 'Description is required'),
  challengeType: z.nativeEnum(ChallengeType),
  creator: z.string().min(1),
  startDate: z.string().min(1, 'Start date is required'),
  trainingIds: z.array(z.number()).min(1),
});
export type CreateChallengeDto = z.infer<typeof createChallengeDtoSchema>;

export function CreateChallenge() {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(0);
  const { data: trainings } = useQuery({
    queryKey: ['trainings'],
    queryFn: () => getTrainings(),
  });

  const form = useForm<CreateChallenge>({
    resolver: zodResolver(createChallengeSchema),
    defaultValues: {
      name: '',
      length: 1,
      challengeInfo: '',
      startDate: '',
      visibility: ChallengeType.PRIVATE,
      creator: '',
      trainingIds: [],
      dayTrainings: [],
    },
  });

  const { handleSubmit, watch, setValue } = form;
  const watchedLength = watch('length');
  const watchedDayTrainings = watch('dayTrainings') || [{ day: 1, training: null }];

  // Generate day trainings based on challenge length
  const generateDayTrainings = (length: number) => {
    const dayTrainings = Array.from({ length }, (_, index) => ({
      day: index + 1,
      training: null,
    }));
    setValue('dayTrainings', dayTrainings);
  };

  const handleLengthChange = (length: number) => {
    setValue('length', length);
    generateDayTrainings(length);
  };

  const handleDayTrainingChange = (day: number, training: any) => {
    const updatedTrainings = watchedDayTrainings.map((dt) =>
      dt.day === day ? { ...dt, training } : dt,
    );
    setValue('dayTrainings', updatedTrainings);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const onSubmit = (data: CreateChallenge) => {
    console.log('Form submitted:', data);
    try {
      createChallenge({
        challengeInfo: data.challengeInfo,
        challengeType: data.visibility,
        creator: data.creator,
        startDate: data.startDate,
        trainingIds: data.trainingIds?.filter((id) => id !== undefined) || [],
      });
      toast.success('Challenge created successfully');
      navigate('/challenges');
    } catch (error) {
      console.error('Error creating challenge:', error);
      toast.error('Error creating challenge');
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.getValues());
          }}
          className="space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (Days) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="365"
                          {...field}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value) || 1;
                            field.onChange(value);
                            handleLengthChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="challengeInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your challenge..." rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date *</FormLabel>
                      <FormControl>
                        <Input type="date" min={getTomorrowDate()} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Visibility *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ChallengeType.PRIVATE}>Private</SelectItem>
                          <SelectItem value={ChallengeType.GROUP}>Group</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daily Training Schedule</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Assign a training for each day of your challenge
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => navigate('/training/create')}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Training
              </Button>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="dayTrainings"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <InteractiveCalendar
                          days={watchedDayTrainings.map((day) => day.training != null)}
                          currentDay={currentDay}
                          onDayClick={(day) => setCurrentDay(day)}
                          title="Select a training for each day of your challenge"
                        />

                        <div>
                          <FormLabel>Training for Day {currentDay + 1}</FormLabel>
                          <Select
                            value={watchedDayTrainings[currentDay]?.training?.title || ''}
                            onValueChange={(value) => {
                              const selectedTraining = trainings?.find(
                                (training: any) => training.title === value,
                              );
                              handleDayTrainingChange(currentDay + 1, selectedTraining || null);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a training for this day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No training</SelectItem>
                              {trainings?.map((training: any) => (
                                <SelectItem key={training.title} value={training.title}>
                                  {training.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Challenge</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

