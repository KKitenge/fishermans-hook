import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {UPDATE_USER_AGREEMENT} from '../../utils/mutations';

const TermsCheckbox = ({ userId }) => {
    const [updateUserAgreement, { loading, error }] = useMutation(UPDATE_USER_AGREEMENT);
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheck = async (e) => {
      setIsChecked(e.target.checked);
      if (e.target.checked) {
        await updateUserAgreement({ variables: { userId, hasAgreed: true } });
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
  }
  
  export default TermsCheckbox;