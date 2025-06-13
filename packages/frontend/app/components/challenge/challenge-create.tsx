import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { createChallenge } from '~/api/challenges';
import { getTrainings, type Training } from '~/api/trainings';
import { ChallengeType } from '~/constants/enums/challenge-type.enum';
import { Role } from '~/constants/enums/roles.enum';
import { useAuth } from '../auth/AuthProvider';
import { dayNames, InteractiveCalendar } from '../interactive-calendar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DatePicker } from '../ui/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const createChallengeSchema = z.object({
  length: z
    .number()
    .min(1, 'Length must be at least 1 day')
    .max(365, 'Length cannot exceed 365 days'),
  challengeInfo: z.string().min(1, 'Description is required'),
  startDate: z
    .date()
    .refine(
      (date) => !date || date >= new Date(new Date().setHours(0, 0, 0, 0)),
      'Start date must be today or in the future',
    ),
  visibility: z.nativeEnum(ChallengeType),
  trainingIds: z.array(z.number()),
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

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);
  return tomorrow;
};

const getTomorrowLocalDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

export function CreateChallenge() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDay, setCurrentDay] = useState(0);
  const { data: trainings } = useSuspenseQuery({
    queryKey: ['trainings'],
    queryFn: () => getTrainings(),
  });
  const { mutate: createChallengeMutation } = useMutation({
    mutationFn: (data: CreateChallengeDto) => createChallenge(data),
    onSuccess: () => {
      toast.success('Challenge created successfully');
      navigate('/challenges');
    },
    onError: () => {
      toast.error('Error creating challenge');
    },
  });

  const form = useForm<CreateChallenge>({
    resolver: zodResolver(createChallengeSchema),
    defaultValues: {
      length: 1,
      challengeInfo: '',
      startDate: getTomorrowDate(),
      visibility: ChallengeType.PRIVATE,
      trainingIds: [undefined],
    },
  });

  const { handleSubmit, watch, setValue } = form;
  const watchedTrainingIds = watch('trainingIds');
  const watchedStartDate = watch('startDate');

  const handleLengthChange = (length: number) => {
    setValue('length', length);
    setValue('trainingIds', [
      ...watchedTrainingIds.slice(0, Math.min(watchedTrainingIds.length, length)),
      ...Array(Math.max(0, length - watchedTrainingIds.length)).fill(undefined),
    ]);
  };

  const onSubmit = (data: CreateChallenge) => {
    console.log('Form submitted:', data);
    if (!data.startDate) {
      toast.error('Please select a start date');
      return;
    }
    createChallengeMutation({
      challengeInfo: data.challengeInfo,
      challengeType: user?.role === Role.ADMIN ? ChallengeType.GLOBAL : data.visibility,
      creator: user?.username ?? '',
      startDate: data.startDate.toISOString().split('T')[0],
      trainingIds: data.trainingIds?.filter((id) => id !== undefined) || [],
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select start date"
                          disabledDates={(date) => date < getTomorrowLocalDate()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {user?.role === Role.MEMBER && (
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Visibility *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
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
                )}
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
              <Link to="/trainings/create">
                <Button type="button" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Training
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="trainingIds"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <InteractiveCalendar
                          days={watchedTrainingIds.map((id) => id !== undefined)}
                          currentDay={currentDay}
                          onDayClick={(day) => setCurrentDay(day)}
                          title="Select a training for each day of your challenge"
                          startDay={dayNames[watchedStartDate.getDay()]}
                        />

                        <div className="flex flex-col gap-2 w-full">
                          <FormLabel>Training for Day {currentDay + 1}</FormLabel>
                          <Select
                            value={watchedTrainingIds[currentDay]?.toString() ?? ''}
                            onValueChange={(value) => {
                              const selectedTraining = trainings.find(
                                (training: Training) => training.id.toString() === value,
                              );
                              const newTrainingIds = [...watchedTrainingIds];
                              newTrainingIds[currentDay] = selectedTraining?.id;
                              field.onChange(newTrainingIds);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a training for this day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No training</SelectItem>
                              {trainings?.map((training: any) => (
                                <SelectItem key={training.id} value={training.id.toString()}>
                                  {training.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col gap-2 w-full p-2">
                          <p className="text-sm whitespace-pre-wrap">
                            {trainings.find(
                              (training: Training) =>
                                training.id === watchedTrainingIds[currentDay],
                            )?.trainingInfo ?? 'No description available'}
                          </p>
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
            <Button type="submit">Create Challenge</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

