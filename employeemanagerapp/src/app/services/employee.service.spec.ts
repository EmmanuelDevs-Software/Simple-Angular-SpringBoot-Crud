import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeService } from './employee.service';

fdescribe('EmployeeService', () => {
  let service: EmployeeService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService],
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    injector = getTestBed();
    service = TestBed.get(EmployeeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector;
    service;
    httpMock;
  });
  it('Everything OK', () => {
    expect(service).toBeTruthy();
  });

  fdescribe('Should execute GET Method', () => {
    it('Get ALL employees', () => {
      const result = 'testing';
      service.getEmployees().subscribe((response) => {
        console.log(response);

        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:8080/employee/all');
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });
  });

  fdescribe('POST a Employee', () => {
    const employee = {
      id: 4,
      email: 'pepito4@gmail.com',
      imageUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      jobTitle: 'Python',
      name: 'Pepito',
      phone: '555333222',
      employeeCode: 'pepito4',
    };

    it('should execute POST Method', () => {
      service.addEmployee(employee).subscribe((res) => {
        expect(res).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:8080/employee/add');
      expect(req.request.method).toBe('POST');
    });
  });

  fdescribe('PUT Method', () => {
    const employee = {
      id: 2,
      email: 'pepito@gmail.com',
      imageUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      jobTitle: 'Python',
      name: 'Pepita',
      phone: '555333222',
      employeeCode: 'pepito',
    };

    it('should update employee', () => {
      service.updateEmployee(employee).subscribe((res) => {
        expect(res).toBe(employee);
      });

      const req = httpMock.expectOne('http://localhost:8080/employee/update');
      expect(req.request.method).toBe('PUT');
    });
  });

  fdescribe('DELETE Method', () => {
    it('should delete employee', () => {
      service.deleteEmployee(1).subscribe((res) => {
        expect(res).toBeTruthy();
      });
      const req = httpMock.expectOne('http://localhost:8080/employee/delete/1');
      expect(req.request.method).toBe('DELETE');
    });
  });
});
