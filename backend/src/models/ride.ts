import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Driver from './Driver';

@Table({ tableName: 'rides', timestamps: false })
export default class Ride extends Model {
   @Column({ type: DataType.STRING, allowNull: false })
   customer_id!: string;

   @Column({ type: DataType.STRING, allowNull: false })
   origin!: string;

   @Column({ type: DataType.STRING, allowNull: false })
   destination!: string;

   @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
   distance!: number;

   @Column(DataType.STRING)
   duration!: string;

   @ForeignKey(() => Driver)
   @Column
   driver_id!: number;

   @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
   value!: number;
}
