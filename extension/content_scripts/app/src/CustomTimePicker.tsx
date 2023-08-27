import React, { useState } from 'react';

function CustomTimePicker() {
  const [selectedTime, setSelectedTime] = useState('');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentInterval = currentMinutes < 30 ? 0 : 30;

  const timeOptions = [];
  for (let hour = currentHour; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const totalMinutes = hour * 60 + minute;
      if (totalMinutes >= currentHour * 60 + currentInterval) {
        const period = hour < 12 ? 'AM' : 'PM';
        const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const formattedMinute = minute === 0 ? '00' : minute;
        const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;
        timeOptions.push(formattedTime);
      }
    }
  }

  return (
    <select
      className={`rounded-[8px] w-[189px] h-[48px] border-2 px-[16px] py-[10px] outline outline-transparent placeholder-[#3B3B3B] text-black font-Inter hover:border-[#3B3B3B] bg-white focus:border-[#4159A5] focus:ring-[#4159A5] active:outline-none ${
        selectedTime === '' ? 'ring-[#B3261E] border-[#B3261E]' : 'border-[#3B3B3B]'
      } `}
      value={selectedTime}
      onChange={(e) => setSelectedTime(e.target.value)}
    >
      <option value="">Select a time</option>
      {timeOptions.map((timeOption, index) => (
        <option key={index} value={timeOption}>
          {timeOption}
        </option>
      ))}
    </select>
  );
}

export default CustomTimePicker;
