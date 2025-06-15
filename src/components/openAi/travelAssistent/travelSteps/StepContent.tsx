import { motion, AnimatePresence } from 'framer-motion';
import StepButton from "./stepButton/StepButton" 
import {
  FaHiking,
  FaSpa,
  FaLandmark,
  FaUtensils,
  FaChild,
  FaUser,
} from 'react-icons/fa';

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

export default function StepContent({ stepIndex, form, handleSelect, toggleInterest }: StepContentProps) {
    return (
  <AnimatePresence mode="wait">
        <motion.div key={stepIndex} {...stepAnimation} className="space-y-4">
          {stepIndex === 0 && (
            <div>
              <h3 className="mb-4 font-bold text-xl text-center">What kind of traveler are you?</h3>
              <div className="grid grid-cols-3 gap-4 w-[300px] mx-auto">
                {[
                  { label: 'Adventure', icon: <FaHiking /> },
                  { label: 'Relax', icon: <FaSpa /> },
                  { label: 'Culture', icon: <FaLandmark /> },
                  { label: 'Food', icon: <FaUtensils /> },
                  { label: 'Children', icon: <FaChild /> },
                  { label: 'Solo', icon: <FaUser /> },
                ].map(({ label, icon }) => (
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
              <p className="mb-2 font-medium">Select your budget per day:</p>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleSelect('budget', level)}
                    className={`p-2 px-4 rounded ${
                      form.budget === level
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-blue-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div>
              <p className="mb-2 font-medium">How many days will you stay?</p>
              <div className="flex gap-2 flex-wrap">
                {['1', '3', '5', '7', 'More than 7'].map((day) => (
                  <button
                    key={day}
                    onClick={() => handleSelect('days', day)}
                    className={`p-2 px-4 rounded ${
                      form.days === day
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-blue-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div>
              <p className="mb-2 font-medium">Choose the season of your trip:</p>
              <div className="flex gap-2 flex-wrap">
                {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                  <button
                    key={season}
                    onClick={() => handleSelect('season', season)}
                    className={`p-2 px-4 rounded ${
                      form.season === season
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-blue-100'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 4 && (
            <div>
              <p className="mb-2 font-medium">Select your interests:</p>
              <div className="flex flex-wrap gap-3">
                {['Museums', 'Nature', 'Beaches', 'Gastronomy', 'Shopping', 'History'].map(
                  (interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2 px-3 rounded border ${
                        form.interests.includes(interest)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-800 border-gray-300'
                      }`}
                    >
                      {interest}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
)}
