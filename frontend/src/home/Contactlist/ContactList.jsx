import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/get_contacts/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <h3>{contact.name}</h3>
            <p>{contact.Number}</p>
            <p>{contact.email}</p>
            <span>{contact.category}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;