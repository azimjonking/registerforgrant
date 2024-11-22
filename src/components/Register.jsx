import { useEffect, useRef, useState } from "react";
import styles from "./Register.module.css";
import { PatternFormat } from "react-number-format";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [phone, setPhone] = useState("");
  const ageRef = useRef();
  const subjectRef = useRef();
  const addressRef = useRef();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });
  }, []);

  const handleCreateUser = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phone,
      age: parseInt(ageRef.current.value),
      subject: subjectRef.current.value,
      address: addressRef.current.value,
    };

    console.log("User created successfully:", user);
  };

  const clearInputs = (e) => {
    e.preventDefault();
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    setPhone("");
    ageRef.current.value = "";
    subjectRef.current.value = "null";
    addressRef.current.value = "";
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!firstNameRef.current.value || firstNameRef.current.value.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long.";
    }

    if (!lastNameRef.current.value || lastNameRef.current.value.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long.";
    }

    if (!phone || !/^\+998\d{9}$/.test(phone)) {
      newErrors.phone = "Phone number must match the format +998#########.";
    }

    if (!ageRef.current.value || parseInt(ageRef.current.value) <= 0) {
      newErrors.age = "Age must be a positive number.";
    }

    if (!subjectRef.current.value || subjectRef.current.value === "null") {
      newErrors.subject = "Please select a valid subject.";
    }

    if (!addressRef.current.value || addressRef.current.value.length < 5) {
      newErrors.address = "Address must be at least 5 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreateUser}>
        <h1>Register for Grant</h1>

        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              ref={firstNameRef}
              type="text"
              id="firstName"
              placeholder="Azimjon"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              ref={lastNameRef}
              type="text"
              id="lastName"
              placeholder="Jalilov"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <PatternFormat
              format="+998#########"
              allowEmptyFormatting
              mask=""
              name="loginPhone"
              value={""}
              onValueChange={(values) => {
                setPhone(values.formattedValue);
              }}
              required
              placeholder="Enter phone number"
              autoComplete="off"
              id="phone"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="age">Age</label>
            <input
              ref={ageRef}
              type="number"
              id="age"
              placeholder="25"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <select name="subject" id="subject" ref={subjectRef}>
              <option value="null">Yo`nalish tanlang</option>
              <option value="web dasturlash">Web dasturlash</option>
              <option value="kiberxavfsizlik">Kiberxavfsizlik</option>
              <option value="kompyuter savodxonligi">
                Kompyuter savodxonligi
              </option>
              <option value="grafik dizayn">Grafik dizayn</option>
              <option value="it kids">IT Kids</option>
              <option value="smm">SMM</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              ref={addressRef}
              type="text"
              id="address"
              placeholder="Namangan viloyati, Namangan shahri"
              required
            />
          </div>

          <div className={styles.btns}>
            <button className={styles.send}>Send</button>
            <button className={styles.clear} onClick={clearInputs}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
