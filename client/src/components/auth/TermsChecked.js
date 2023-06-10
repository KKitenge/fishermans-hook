import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import {UPDATE_USER_AGREEMENT} from '../../utils/mutations';

const TermsCheckbox = ({ email, }) => {
    const [updateUserAgreement, { loading, error }] = useMutation(UPDATE_USER_AGREEMENT);
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheck = async (e) => {
      setIsChecked(e.target.checked);
      if (e.target.checked) {
        await updateUserAgreement({ variables: { email, hasAgreed: true } });
      }
    }
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
      <div>
        <label>
          <input type="checkbox" checked={isChecked} onChange={handleCheck} />
          I agree to the terms of service
        </label>
      </div>
    );
  };
  
  export default TermsCheckbox;