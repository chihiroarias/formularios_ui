import React, { useState, useEffect } from "react";

function CreateDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    // Obtener la fecha actual en formato yyyy-mm-dd
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required pattern="\d{4}-\d{2}-\d{2}"
      />
    </div>
  );
}

export default CreateDate;
