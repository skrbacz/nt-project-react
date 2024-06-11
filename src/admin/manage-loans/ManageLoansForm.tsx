import React, { useEffect, useState } from 'react';
import LoanScrollableList from './LoanScrollableList';
import { LoanProps } from '../../loan/Loan';
import { useApi } from '../../api/ApiProvider';
import AddLoan from './AddLoan';

const ManageLoansForm: React.FC = () => {
  const [loans, setLoans] = useState<LoanProps[]>([]);
  const apiClient = useApi();

  const fetchAllLoans = async () => {
    try {
      let allLoans: LoanProps[] = [];
      let currentPage = 0;
      let hasMore = true;

      while (hasMore) {
        const loansResponse = await apiClient.getLoans(currentPage);
        const loans = loansResponse.data?.loans || [];
        allLoans = allLoans.concat(loans);
        hasMore = loansResponse.data?.hasMore || false;
        currentPage++;
      }

      const sorted = allLoans.sort((a: LoanProps, b: LoanProps) => {
        if (a.returnDate === null && b.returnDate !== null) return -1;
        if (a.returnDate !== null && b.returnDate === null) return 1;
        return b.loanId - a.loanId;
      });

      setLoans(sorted);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const deleteLoan = (loanId: number) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.loanId !== loanId));
  };

  useEffect(() => {
    fetchAllLoans();
  }, [apiClient]);

  return (
    <div>
      <AddLoan onAddLoan={fetchAllLoans} />
      <hr style={{ borderColor: 'rgba(0, 0, 0, 0.1)', margin: '10px 0' }} />
      <LoanScrollableList loans={loans} onDeleteLoan={deleteLoan} />
    </div>
  );
};

export default ManageLoansForm;
