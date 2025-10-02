import React from 'react';
import { Plus, Calendar, Clock, MapPin, User } from 'lucide-react';

// Dummy data, replace with actual data from your API
const schedule = [
  {
    id: 1,
    date: '25 Oktober 2024',
    time: '09:00 - 11:00',
    studentName: 'Budi Santoso',
    examiners: ['Prof. Dr. Retno, S.Kom.', 'Dr. Budi, M.Kom.'],
    room: 'Ruang Sidang 1',
  },
  {
    id: 2,
    date: '25 Oktober 2024',
    time: '13:00 - 15:00',
    studentName: 'Citra Lestari',
    examiners: ['Dr. Ir. Suryo, M.Sc.', 'Prof. Dr. Retno, S.Kom.'],
    room: 'Ruang Sidang 2',
  },
  // ... more schedules
];

export default function JadwalSidangPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-maroon-800">Jadwal Sidang</h1>
        <button className="flex items-center bg-maroon-600 text-white px-4 py-2 rounded-lg hover:bg-maroon-700 transition-colors duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Jadwal
        </button>
      </div>

      <div className="space-y-8">
        {schedule.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800">{item.studentName}</h2>
                <div className="flex items-center text-gray-600 mt-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{item.date}</span>
                  <Clock className="w-5 h-5 ml-6 mr-2" />
                  <span>{item.time}</span>
                </div>
              </div>
              <div className="text-gray-700">
                <div className="flex items-center mb-2">
                  <User className="w-5 h-5 mr-2" />
                  <strong>Penguji:</strong>
                  <span className="ml-2">{item.examiners.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <strong>Ruangan:</strong>
                  <span className="ml-2">{item.room}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}