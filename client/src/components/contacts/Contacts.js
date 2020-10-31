import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { motion } from 'framer-motion';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) return <h4>Please add a Contact</h4>;

  return (
    <div>
      <Fragment>
        {filtered !== null
          ? filtered.map((contact) => (
              <motion.div
                key={contact._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ContactItem contact={contact} />
              </motion.div>
            ))
          : contacts.map((contact) => (
              <motion.div
                key={contact.id}
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ContactItem contact={contact} />
              </motion.div>
            ))}
      </Fragment>
    </div>
  );
};
export default Contacts;
