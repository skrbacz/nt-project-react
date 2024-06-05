import React, { useState } from 'react';
import { useApi } from '../api/ApiProvider';

const RegisterUserForm: React.FC = () => {
  const apiClient = useApi();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'role_reader',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await apiClient.postRegister(
      formData.username,
      formData.password,
      formData.role,
      formData.email
    );
    if (response.success) {
      console.log('User registered successfully!');
      // Optionally, you can clear the form fields here
      setFormData({
        username: '',
        password: '',
        role: '',
        email: ''
      });
    } else {
      console.error('Error registering user:', response.statusCode);
      // Handle error condition here, e.g., display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="ROLE_READER">Reader</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterUserForm;
