import React from 'react';
import './MeForm.css';
import Me from '../me/Me';
import LoansGrid from '../loans-grid/LoansGrid';

const meData = [
  {
    id: 1,
    name: 'Oliwia',
    lastname: 'Skrobacz',
    email: 'example@gmail.com',
  },
];

const myLoans = [
  {
    id: 1,
    title: 'Book',
    author: 'Book',
    yearPublished: 8004,
    loanDate: '2022-01-01',
    dueDate: '2022-02-01',
  },
  {
    id: 2,
    title: "TIL IT'S DONE",
    author: 'Toni Gustavson',
    yearPublished: 2023,
    loanDate: '2023-07-20',
    dueDate: '2022-08-20',
  },
  {
    id: 3,
    title: 'From Steve to all Stevies',
    author: 'Steve',
    yearPublished: 2009,
    loanDate: '2019-02-23',
    dueDate: '2022-02-01',
  },
];

export default function MeForm() {
  const user = meData[0];
  const userLoan = myLoans;

  return (
    <div className="me-form">
      <div className="me">
        <Me
          id={user.id}
          name={user.name}
          lastname={user.lastname}
          email={user.email}
        />
      </div>
      <div className="loans-grid">
        <LoansGrid loans={userLoan} />
      </div>
    </div>
  );
}
