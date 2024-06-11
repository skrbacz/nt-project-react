import React from 'react';
import { useApi } from '../../api/ApiProvider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { LoanProps } from '../../loan/Loan';
import { useTranslation } from 'react-i18next';

interface LoanScrollableListProps {
  loans: LoanProps[];
  onDeleteLoan: (loanId: number) => void;
}

const LoanScrollableList: React.FC<LoanScrollableListProps> = ({
  loans,
  onDeleteLoan,
}) => {
  const apiClient = useApi();
  const { t } = useTranslation();

  const handleDelete = async (loanId: number) => {
    console.log(t('delAttemptLoan') + loanId);
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      console.log(t('delSuccLoan') + loanId);
      onDeleteLoan(loanId);
    } else {
      console.error(t('delErrorLoan'), response.statusCode);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('loanList')}
      </Typography>
      <List sx={{ overflow: 'auto', maxHeight: 350 }}>
        {loans.map((loan: LoanProps, index) => (
          <React.Fragment key={loan.loanId}>
            <ListItem>
              <ListItemIcon>
                <IconButton onClick={() => handleDelete(loan.loanId)}>
                  <DeleteOutlineOutlinedIcon
                    style={{
                      cursor: 'pointer',
                      marginLeft: '5px',
                      color: 'red',
                    }}
                  />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={t('loanId') + ': ' + loan.loanId}
                secondary={t('userId')  + ": " + loan.user.userId + ", " + t('username') + ": " + loan.user.username + ", " + t('bookId') + ": "  +loan.book.bookId +", "+ t('isbn') + ": "+ loan.book.isbn + ", "  + t('loanDate') + ": " + loan.loanDate + ", " + t('dueDate') + ": " +loan.dueDate + ", " + t('returnDate') + ": " + (loan.returnDate || 'Not Returned')}
              />
            </ListItem>
            {index < loans.length - 1 && (
              <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default LoanScrollableList;
