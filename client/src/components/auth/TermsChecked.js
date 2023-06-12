import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import {UPDATE_USER_AGREEMENT} from '../../utils/mutations';

// This component is used to update the user's agreement to the terms of service
const TermsCheckbox = ({ email, }) => {
  // This is the mutation that updates the user's agreement to the terms of service
    const [updateUserAgreement, { loading, error }] = useMutation(UPDATE_USER_AGREEMENT);
    const [isChecked, setIsChecked] = useState(false);

    // This function handles the checkbox being checked or unchecked
    const handleCheck = async (e) => {
      setIsChecked(e.target.checked);
      if (e.target.checked) {
        await updateUserAgreement({ variables: { email, hasAgreed: true } });
      }
    }
  
    // If the mutation is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // If there is an error, display an error message
    if (error) return <p>Error :(</p>;
    
    // This is the checkbox that is displayed on the page
    return (
      <div>
        <label>
          <input type="checkbox" checked={isChecked} onChange={handleCheck} />
          I agree to the terms of service
        </label>
      </div>
    );
  };
  
  // This exports the TermsCheckbox component so that it can be used in other files
  export default TermsCheckbox;