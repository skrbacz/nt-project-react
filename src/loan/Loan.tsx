import React from "react";
import './Loan.css';
import { Card, CardContent, Typography } from "@mui/material";

export interface LoanProps {
  id: number
  title: string
  author: string
  yearPublished: number
  loanDate: string
  dueDate: string
}

export default function Loan({ id, title, author, yearPublished, loanDate, dueDate }: LoanProps) {

  return (
    <Card className="loan">
      <CardContent className="loan-text">
        <Typography>Loan id: {id}</Typography>
        <Typography>Title: {title}</Typography>
        <Typography>Author: {author}</Typography>
        <Typography>Year of publication: {yearPublished}</Typography>
        <Typography>Loan date: {loanDate}</Typography>
        <Typography>Due date: {dueDate}</Typography>
      </CardContent>
      </Card>
  );
}