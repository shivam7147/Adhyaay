import React, { useState, useEffect } from "react";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

interface Mentor {
  _id: string;
  name: string;
  email: string;
}

interface FormData {
  juniorName: string;
  juniorEmail: string;
  semester: string;
  description: string;
  mentor: string;
  date: string;
}

const BookingComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    juniorName: "",
    juniorEmail: "",
    semester: "",
    description: "",
    mentor: "",
    date: "",
  });

  const [mentors, setMentors] = useState<Mentor[]>([]);

  // Fetch user info from /me
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData((prev) => ({
          ...prev,
          juniorName: res.data.name || "",
          juniorEmail: res.data.email || "",
        }));
      } catch (err) {
        // Optional: toast.error("Failed to load user info");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await api.get("/mentors");
        setMentors(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error("Failed to load mentors. Try again later.");
      }
    };
    fetchMentors();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (
      !formData.juniorName ||
      !formData.juniorEmail ||
      !formData.semester ||
      !formData.description ||
      !formData.mentor ||
      !formData.date
    ) {
      toast.error("Please fill in all fields before submitting!");
      return;
    }

    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      await api.post("/appointments", payload);

      toast.success("Appointment booked successfully!");
      setFormData({
        juniorName: "",
        juniorEmail: "",
        semester: "",
        description: "",
        mentor: "",
        date: "",
      });
    } catch (err) {
      toast.error("Error booking appointment. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-2 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Book a Session
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="juniorName"
            placeholder="Your Name"
            value={formData.juniorName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            readOnly // User can't edit
          />

          <input
            type="email"
            name="juniorEmail"
            placeholder="Email"
            value={formData.juniorEmail}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            readOnly // User can't edit
          />

          {/* ...rest of your form remains same... */}
          <input
            type="text"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />

          <select
            name="mentor"
            value={formData.mentor}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
          >
            <option value="" disabled>
              Select a Mentor
            </option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-6 shadow-md"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;