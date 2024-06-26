import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UserRole } from '../admin/UserRole';
import { NavigateToLogin } from './NavigateToLogin';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

type LocalDate = string;

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081/api',
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          NavigateToLogin();
        }
        return Promise.reject(error);
      }
    );
  }


  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/auth/login',
        data,
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      }

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async logout() {
    localStorage.removeItem('token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  public async postRegister(
    username: string,
    password: string,
    role: UserRole,
    email: string,
  ): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.post(`/auth/register`, {
        username,
        password,
        role,
        email,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooks(page: number) {
    try {
      console.log(this.client.defaults.headers.common['Authorization']);
      const response = await this.client.get(`/books?page=${page}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getMe() {
    try {
      const response = await this.client.get('/users/me');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoansOneUser(userId: number, page: number) {
    try {
      const response = await this.client.get(
        `/loans?userId=${userId}&page=${page}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(page: number) {
    try {
      const response = await this.client.get(`/loans?page=${page}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteLoan(loanId: number) {
    try {
      const response = await this.client.delete(`/loans/${loanId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBookById(bookId: number) {
    try {
      const response = await this.client.get(`/books?bookId=${bookId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async postLoan(bookId: number, userId: number, dueDate: LocalDate) {
    try {
      const response = await this.client.post(`/loans`, {
        bookId,
        userId,
        dueDate,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getReviewByBookId(bookId: number) {
    try {
      const response = await this.client.get(`/reviews/book/${bookId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async postReview(
    bookId: number,
    userId: number,
    rating: number,
    comment: string,
  ): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.post(`/reviews`, {
        bookId,
        userId,
        rating,
        comment,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async patchLoanReturnBook(loanId: number) {
    try {
      const response = await this.client.patch(`/loans/${loanId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteReview(reviewId: number) {
    try {
      const response = await this.client.delete(`/reviews/${reviewId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async postBook(
    isbn: string,
    title: string,
    author: string,
    publisher: string,
    yearPublished: number,
    availableCopies: number,
  ): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.post(`/books`, {
        isbn,
        title,
        author,
        publisher,
        yearPublished,
        availableCopies,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async patchBookDetials(
    bookid: number,
    genre: string,
    summary: string,
    coverImageUrl: string,
  ): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.patch(`/books/details/${bookid}`, {
        genre,
        summary,
        coverImageUrl,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(bookid: number): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.delete(`/books/${bookid}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async patchUser(userId: number, name: string, lastname: string) {
    try {
      const response = await this.client.patch(`/users/${userId}`, {
        name,
        lastname,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getUsers(currentPage: number) {
    try {
      const response = await this.client.get(`/users?page=${currentPage}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(userId: number): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.delete(`/users/${userId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
