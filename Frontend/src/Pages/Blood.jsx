import React, { useState, useEffect } from "react";
import "./BloodDonors.css";

const Blood = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users/blood");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((user) => ({
          ...user,
          collegeId: user.collegeId || user.email.split("@")[0],
        }));
        setUsers(formattedData);
      } catch (e) {
        console.error("Failed to fetch data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-black text-white flex justify-center items-center">
        <h1 className="text-2xl animate-pulse">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-black text-red-500 flex flex-col justify-center items-center p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Error fetching data</h1>
        <p className="text-lg">
          Please ensure your local server is running on port 5001.
        </p>
        <p className="text-sm mt-2">Error details: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 font-sans relative blood-donors-background">
      {" "}
      <div className="relative z-10 max-w-4xl mx-auto">
        {" "}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-400">
          Blood Donors
        </h1>
        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
                <tr>
                  <th scope="col" className="px-6 py-4 tracking-wider">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-4 tracking-wider">
                    College ID
                  </th>
                  <th scope="col" className="px-6 py-4 tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 tracking-wider">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-4 tracking-wider">
                    Blood Group
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-800 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.collegeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">number</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.bloodGroup}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No blood donor data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blood;
