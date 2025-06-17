import { useQuery } from '@tanstack/react-query';
import { getDietRecommendation } from '~/api/diet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { InlineDnaLoader } from '~/components/ui/dna-loader';
import type { Route } from './+types/diet';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Diet Recommendations' },
    { name: 'description', content: 'View your personalized diet recommendations' },
  ];
}

export default function DietPage() {
  const {
    data: dietRecommendation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dietRecommendation'],
    queryFn: getDietRecommendation,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <InlineDnaLoader height={60} width={60} ariaLabel="Loading diet recommendations..." />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error instanceof Error && error.cause instanceof Response && error.cause.status === 400
        ? 'Insufficient data to generate diet recommendations. Please complete your profile.'
        : 'Failed to load diet recommendations. Please try again later.';
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{errorMessage}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-8 px-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Diet Recommendations</h1>
        <p className="text-gray-600">Personalized nutrition guidance based on your profile</p>
      </div>

      <div className="grid gap-6">
        {/* BMR Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Daily Calorie Target</CardTitle>
            <CardDescription>
              Your Basal Metabolic Rate (BMR) - the minimum calories your body needs daily
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">
                {dietRecommendation?.bmr.toLocaleString()}
              </div>
              <div className="text-lg text-gray-600">calories/day</div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  This is your baseline caloric requirement. Adjust based on your activity level and
                  goals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendation Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-600">AI Diet Recommendations</CardTitle>
            <CardDescription>Personalized nutrition advice tailored to your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {dietRecommendation?.ai_response}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                • These recommendations are based on general guidelines and your profile
                information.
              </p>
              <p>
                • Consult with a healthcare professional or registered dietitian for personalized
                medical advice.
              </p>
              <p>
                • Adjust your caloric intake based on your activity level, health goals, and how
                your body responds.
              </p>
              <p>• Stay hydrated and maintain a balanced diet with variety from all food groups.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

