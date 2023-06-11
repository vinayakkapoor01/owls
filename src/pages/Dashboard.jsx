import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
function Dashboard() {
  const [isApproved, setIsApproved] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  console.log(location.state.id);
  const email = location.state.id;
  useEffect(() => {
    const handleCheckApproval = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/counselors/approval',
          {
            email,
          },
        );
        const { isApproved } = response.data;
        setIsApproved(isApproved);
      } catch (error) {
        console.error('Error checking counselor approval status:', error);
      }
    };

    handleCheckApproval();
  }, []);
  return (
    <div>
      {isApproved ? (
        <div>
          <h1>Welcome to the Counselor Dashboard!</h1>
          {/* Render the approved content */}
        </div>
      ) : (
        <div>
          <h1>Not Approved</h1>
          <p>
            Your account is pending approval. Please wait for the administrator
            to approve your account.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
