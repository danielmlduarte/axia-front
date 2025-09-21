import * as React from 'react';

export default function DeletableChips() {
  const getYear = () => {
    const today = new Date(Date.now())
    return today.getUTCFullYear()
  }

  return (
    <div className="footer-container">
      <span>{`Copyright © ${getYear()} Axia Consultoria. All rights reserved.`}</span>
    </div>
  );
}