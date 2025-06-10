import { useState } from 'react';
import type { Member } from '~/api/members';
import { FitnessGoal } from '~/constants/enums/fitness.enum';
import { Gender } from '~/constants/enums/genders.enum';

export const useEditProfile = (initialData: Member) => {
  const [username, setUsername] = useState(initialData.username);
  const [weight, setWeight] = useState(
    initialData.weight ? Math.floor(initialData.weight) : undefined,
  );
  const [gender, setGender] = useState(initialData.gender ?? Gender.MALE);
  const [height, setHeight] = useState(initialData.height);
  const [fitnessGoal, setFitnessGoal] = useState(initialData.goal ?? FitnessGoal.MAINTAIN_WEIGHT);
  const [additionalInfo, setAdditionalInfo] = useState(initialData.additional_info);

  return {
    username,
    weight,
    gender,
    height,
    fitnessGoal,
    additionalInfo,
    setUsername,
    setWeight,
    setGender,
    setHeight,
    setFitnessGoal,
    setAdditionalInfo,
  };
};

