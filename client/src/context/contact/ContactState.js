import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // const addContact = async (contact) => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   try {
  //     const res = await axios.post('/api/contacts', contact, config);

  //     dispatch({ type: ADD_CONTACT, payload: res.data });
  //   } catch (error) {
  //     dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
  //   }
  // };
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios
      .post('api/contacts', contact, config)
      .then((res) => {
        dispatch({ type: ADD_CONTACT, payload: res.data });
      })
      .catch((error) =>
        dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
      );
  };

  const deleteContact = async (id) => {
    await axios
      .delete(`/api/contacts/${id}`)
      .then(() => dispatch({ type: DELETE_CONTACT, payload: id }))
      .catch((error) =>
        dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
      );
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios
      .put(`/api/contacts/${contact._id}`, contact, config)
      .then((res) => dispatch({ type: UPDATE_CONTACT, payload: res.data }))
      .catch((error) =>
        dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
      );
  };

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        clearFilter,
        filterContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        error: state.error,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
