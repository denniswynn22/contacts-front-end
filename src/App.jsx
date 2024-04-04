import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] =
  useState([])
  
  
  // swap css attributes when we click button
  const [hidden, setHidden] = useState(true);
  
  const [newContact, setNewContact] = useState({ name: '', email_address: '', age: '' });
  
  useEffect(() => {
    console.log('using effect')

  
  getData()
}, [])

const baseUrl = "https://d3rkg1cpaxghm9.cloudfront.net"
  function getData() {
    console.log('getting data')
    fetch(`${baseUrl}/contacts`)
      .then(res => res.json())
      .then(res => setContacts([...res]))
  }
  function deleteContact(id) {
    fetch(`${baseUrl}/contact/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => getData())
  }
  function addItem() {
    console.log(newContact);
    fetch(`${baseUrl}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then(res => res.json())
      .then(res => getData())

    setHidden(!hidden)
  }

  return (
    <div className="App">
      <h1>Contacts</h1>
      <header className="TEST">
        <div className='newContact'>
          <div className='contactCard' >
            {hidden ?
              <button onClick={() => setHidden(!hidden)}>Add New Item</button> :
              <div className='contactCard' >
                <h3>Name:&nbsp;<input onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} value={newContact.name} placeholder='name' /></h3>
                <br />
                <p>Email:&nbsp;<input onChange={(e) => setNewContact({ ...newContact, email_address: e.target.value })} value={newContact.email_address} placeholder='email' /></p>
                <br />
                <p>Age:&nbsp;<input onChange={(e) => setNewContact({ ...newContact, age: e.target.value })} value={newContact.age} placeholder='age' /></p>
                <br />
                <button onClick={() => addItem()}>Submit</button>
              </div>
            }
          </div>

        </div>
        {contacts.map(contact => {
          return (

            <div
              className='contactCard' key={contact.id}>
              <h3>{contact.name}</h3>
              <p>{contact.email_address}</p>
              <p>{contact.age}</p>
              <button onClick={() => updateContact(contact.id)}>Update</button>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </div>
          )
        })}
      </header>
    </div>
  );
}

export default App;
