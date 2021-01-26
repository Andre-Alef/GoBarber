import { v4 as uuidv4 } from 'uuid';
import {isEqual, getMonth, getYear, getDate} from 'date-fns'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '../../infra/typeorm/entities/Appointment'

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'





class AppointmentsRepository implements IAppointmentsRepository {
    
  private appointments: Appointment[] = []
    public async findByDate(date: Date): Promise<Appointment | undefined> {

      const findAppointment = this.appointments.find( 
        appointment => isEqual(appointment.date, date))
        return findAppointment
      }  

      public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

        const findAppointment = this.appointments.filter( 
          appointment => 
          appointment.provider_id === provider_id && 
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year
          )
          return findAppointment
        }  

        public async findAllInDayFromProvider({provider_id, day , month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

          const findAppointment = this.appointments.filter( 
            appointment => 
            appointment.provider_id == provider_id && 
            getDate(appointment.date) == day &&
            getMonth(appointment.date) + 1  == month &&
            getYear(appointment.date) == year
            
            )
            console.log('TESTE1' + getDate(this.appointments[0].date) + '-' + getMonth(this.appointments[0].date) + '-' + getYear(this.appointments[0].date) + ' - ' + this.appointments[0].provider_id)
            console.log(day + '-' + month + '-' + year + ' - ' + provider_id)
            console.log(this.appointments)
            console.log(findAppointment)
            return findAppointment
          }  
    
  

      public async create({provider_id, user_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
          const appointment = new Appointment()

        Object.assign(appointment, {id: uuidv4() , date, provider_id, user_id})      

          this.appointments.push(appointment)

          return appointment
      }


}

export default AppointmentsRepository