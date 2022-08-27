import { useState, useEffect } from "react";
import service from "./services/connection";
import Notification from "./components/Notification";
import Error from "./components/Error";

//This function component will search for the persons name in the search bar
const Filter = ({ persons }) => {
  const [searchPerson, setSearchPerson] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    if (searchPerson.length) {
      setFilteredPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(searchPerson.toLowerCase())
        )
      );
    } else {
      setFilteredPersons([]);
    }
  }, [searchPerson]);

  return (
    <div>
      <label>
        Filter shown with
        <input
          value={searchPerson}
          onChange={(e) => setSearchPerson(e.target.value)}
        />
      </label>
      {filteredPersons.map((person) => (
        <FilterPerson key={person.id} person={person} />
      ))}
    </div>
  );
};

//This function component is used for displaying all the persons that exists in the server
const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={onDelete}>delete</button>
    </li>
  );
};

//this component is used to render the searched person
const FilterPerson = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const PersonForm = ({ newInfo, setNewInfo, submitPerson }) => {
  return (
    <div>
      <form onSubmit={submitPerson}>
        <div>
          <label>
            Enter Name:
            <input
              placeholder="enter a Name... "
              value={newInfo.newName}
              onChange={(e) =>
                setNewInfo({ ...newInfo, newName: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            Enter Number:
            <input
              placeholder="enter a Number..."
              value={newInfo.newNumber}
              onChange={(e) =>
                setNewInfo({ ...newInfo, newNumber: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

//main component / core function
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newInfo, setNewInfo] = useState({ newNumber: "", newName: "" });
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    service.getAll().then((data) => setPersons(data));
  }, []);

  const submitPerson = (event) => {
    event.preventDefault();
    const newObject = {
      name: newInfo.newName,
      number: newInfo.newNumber,
      // id: persons.legth + 1, // no need for id since we get it automatically from our database
    };

    const person = persons.find(
      (person) => person.name.toLowerCase() === newInfo.newName.toLowerCase()
    );

    const changedPerson = { ...person, number: newInfo.newNumber };

    if (person) {
      if (
        window.confirm(
          `${newObject.name} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        service
          .update(person.id, changedPerson)
          .then((data) => {
            setPersons(persons.map((p) => (p.id !== person.id ? p : data)))
            setMessage(`Updated ${data.name}'s Number`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
          .catch(err => {
            console.log(err)
            setErrorMessage(`${newInfo.newName} already added in the phonebook!, replace old number with a new one?`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })
      }
    } else {
      service
        .create(newObject)
        .then((data) => {
          setPersons(persons.concat(data))
          setNewInfo({ ...newInfo, newNumber: "", newName: "" })
          setMessage(`Added ${data.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch(error => {
          console.log(error)
          // setErrorMessage(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  };

  const onDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      service.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
      setMessage(`Contact ${name} has been deleted from the phonebook!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    // const matchingIdPerson = persons.find(person => person.id == id)
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Error message={errorMessage} />

      <Filter persons={persons} />
      <h2>add a new</h2>
      <PersonForm
        newInfo={newInfo}
        setNewInfo={setNewInfo}
        submitPerson={submitPerson}
      />
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            onDelete={() => onDelete(person.id, person.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
