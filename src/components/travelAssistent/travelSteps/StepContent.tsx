import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepButton from "./stepButton/StepButton";
import {
  FaHiking,
  FaSpa,
  FaLandmark,
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaRegSmile,
} from 'react-icons/fa';
import { GiThreeFriends, GiLovers, GiBeachBall,  GiShoppingBag, GiForkKnifeSpoon } from "react-icons/gi";
import { HandPlatter } from 'lucide-react';
import { MdOutlineFamilyRestroom, MdBusinessCenter, MdMuseum, MdOutlineFestival } from "react-icons/md";

const stepAnimation = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.3 },
};

type FormState = {
  travelerType: string;
  budget: string;
  days: string;
  season: string;
  interests: string[];
};

type StepContentProps = {
  stepIndex: number;
  form: FormState;
  handleSelect: (key: string, value: string) => void;
  toggleInterest: (interest: string) => void;
};

const travelerTypes = [
  { label: 'Adventure', icon: <FaHiking /> },
  { label: 'Relax', icon: <FaSpa /> },
  { label: 'Culture', icon: <FaLandmark /> },
  { label: 'Romantic', icon: <GiLovers /> },
  { label: 'Family', icon: <MdOutlineFamilyRestroom /> },
  { label: 'Friends', icon: <GiThreeFriends /> },
  { label: 'Solo', icon: <FaUser /> },
  { label: 'Business', icon: <MdBusinessCenter /> },
  { label: 'Luxury', icon: <HandPlatter /> },
];

const budgetOptions = [
  { label: 'Low', icon: <FaMoneyBillWave /> },
  { label: 'Medium', icon: <FaMoneyBillWave /> },
  { label: 'High', icon: <FaMoneyBillWave /> },
];

const daysOptions = [
  { label: '1', icon: <FaCalendarAlt /> },
  { label: '2', icon: <FaCalendarAlt /> },
  { label: '3', icon: <FaCalendarAlt /> },
  { label: '4', icon: <FaCalendarAlt /> },
  { label: '5', icon: <FaCalendarAlt /> },
  { label: '7', icon: <FaCalendarAlt /> },
  { label: 'More than 7', icon: <FaCalendarAlt /> },
];

const seasonOptions = [
  { label: 'Spring', icon: <FaRegSmile /> },
  { label: 'Summer', icon: <FaSun /> },
  { label: 'Autumn', icon: <FaCloudSun /> },
  { label: 'Winter', icon: <FaMoon /> },
];

const interestOptions = [
  { label: 'Museums', icon: <MdMuseum /> },
  { label: 'History', icon: <FaLandmark /> },
  { label: 'Nature', icon: <FaHiking /> },
  { label: 'Beaches', icon: <GiBeachBall /> },
  { label: 'Wellness & Spa', icon: <FaSpa /> },
  { label: 'Gastronomy', icon: <GiForkKnifeSpoon /> },
  { label: 'Shopping', icon: <GiShoppingBag /> },
  { label: 'Nightlife', icon: <FaRegSmile /> },
  { label: 'Festivals', icon: <MdOutlineFestival /> },
];

export default function StepContent({ stepIndex, form, handleSelect, toggleInterest }: StepContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={stepIndex} {...stepAnimation} className="space-y-4">
        {stepIndex === 0 && (
          <div>
            <h3 className="mb-4 font-bold text-xl text-center">What kind of traveler are you?</h3>
            <div className="step-content !grid grid-cols-3 gap-2 w-[300px] mx-auto max-w-full">
              {travelerTypes.map(({ label, icon }) => (
                <StepButton
                  key={label}
                  icon={icon}
                  label={label}
                  selected={form.travelerType === label}
                  onClick={() => handleSelect('travelerType', label)}
                />
              ))}
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div>
            <p className="mb-4 font-medium text-center">Select your budget per day:</p>
            <div className="step-content !grid grid-cols-3 gap-2 w-[300px] mx-auto max-w-full">
              {budgetOptions.map(({ label, icon }) => (
                <StepButton
                  key={label}
                  icon={icon}
                  label={label}
                  selected={form.budget === label}
                  onClick={() => handleSelect('budget', label)}
                />
              ))}
            </div>
          </div>
        )}

        {stepIndex === 2 && (
          <div>
            <p className="mb-4 font-medium text-center">How many days will you stay?</p>
            <div className="step-content !grid grid-cols-3 gap-2 w-[300px] mx-auto max-w-full">
              {daysOptions.map(({ label, icon }) => (
                <StepButton
                  key={label}
                  icon={icon}
                  label={label}
                  selected={form.days === label}
                  onClick={() => handleSelect('days', label)}
                />
              ))}
            </div>
          </div>
        )}

        {stepIndex === 3 && (
          <div>
            <p className="mb-2 font-medium text-center">Choose the season of your trip:</p>
            <div className="step-content !grid grid-cols-4 gap-2 w-[300px] mx-auto max-w-full">
              {seasonOptions.map(({ label, icon }) => (
                <StepButton
                  key={label}
                  icon={icon}
                  label={label}
                  selected={form.season === label}
                  onClick={() => handleSelect('season', label)}
                />
              ))}
            </div>
          </div>
        )}

        {stepIndex === 4 && (
          <div>
            <p className="mb-2 font-medium text-center">Select your interests:</p>
            <div className="step-content !grid grid-cols-3 gap-2 w-[300px] mx-auto max-w-full">
              {interestOptions.map(({ label, icon }) => (
                <StepButton
                  key={label}
                  icon={icon}
                  label={label}
                  selected={form.interests.includes(label)}
                  onClick={() => toggleInterest(label)}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
