import { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { supabase, DoctorBooking as Booking } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Doctor {
  name: string;
  specialty: string;
  description: string;
  color: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Child Psychologist",
    description: "Helping kids feel happy and confident",
    color: "from-blue-400 to-cyan-500"
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Teen Counselor",
    description: "Understanding teenage challenges",
    color: "from-green-400 to-emerald-500"
  },
  {
    name: "Dr. Emily Williams",
    specialty: "Anxiety Specialist",
    description: "Managing worries and stress",
    color: "from-purple-400 to-pink-500"
  },
  {
    name: "Dr. James Brown",
    specialty: "Family Therapist",
    description: "Building stronger relationships",
    color: "from-orange-400 to-red-500"
  }
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export function DoctorBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('doctor_bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('appointment_date', { ascending: false });

    if (data) {
      setBookings(data);
    }
  };

  const handleBooking = async () => {
    if (!user || !selectedDoctor || !selectedDate || !selectedTime || !reason) return;

    const { error } = await supabase.from('doctor_bookings').insert({
      user_id: user.id,
      doctor_name: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      reason,
      status: 'pending'
    });

    if (!error) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setReason('');
      loadBookings();
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Talk to a Doctor</h2>
        <p className="text-gray-600">Our caring doctors are here to help you feel better</p>
      </div>

      {showSuccess && (
        <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6 flex items-center gap-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <p className="font-bold text-green-800 text-lg">Booking Successful!</p>
            <p className="text-green-700">We'll confirm your appointment soon.</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Your Doctor</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {doctors.map((doctor, index) => (
            <button
              key={index}
              onClick={() => setSelectedDoctor(doctor)}
              className={`text-left p-6 rounded-2xl transition-all transform hover:scale-105 ${
                selectedDoctor?.name === doctor.name
                  ? 'bg-gradient-to-r ' + doctor.color + ' text-white shadow-lg scale-105'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                selectedDoctor?.name === doctor.name ? 'bg-white/20' : 'bg-gradient-to-br ' + doctor.color
              }`}>
                <User className={`w-6 h-6 ${selectedDoctor?.name === doctor.name ? 'text-white' : 'text-white'}`} />
              </div>
              <h4 className={`text-lg font-bold mb-1 ${selectedDoctor?.name === doctor.name ? 'text-white' : 'text-gray-800'}`}>
                {doctor.name}
              </h4>
              <p className={`text-sm font-semibold mb-2 ${selectedDoctor?.name === doctor.name ? 'text-white/90' : 'text-gray-600'}`}>
                {doctor.specialty}
              </p>
              <p className={`text-sm ${selectedDoctor?.name === doctor.name ? 'text-white/80' : 'text-gray-600'}`}>
                {doctor.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Choose a Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={minDate}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Choose a Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors text-lg"
              >
                <option value="">Select time...</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-3">
              What would you like to talk about?
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors resize-none"
              rows={4}
              placeholder="Tell us what's on your mind..."
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || !reason}
            className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Appointment
          </button>
        </div>
      )}

      {bookings.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Appointments</h3>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-gray-50 rounded-xl flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                  booking.status === 'confirmed' ? 'from-green-400 to-emerald-500' :
                  booking.status === 'pending' ? 'from-yellow-400 to-orange-500' :
                  'from-gray-400 to-gray-500'
                } flex items-center justify-center`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{booking.doctor_name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.appointment_date).toLocaleDateString()} at {booking.appointment_time}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">Status: {booking.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
