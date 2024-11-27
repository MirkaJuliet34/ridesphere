import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'drivers', timestamps: false })
export default class Driver extends Model {
   @Column({ type: DataType.STRING, allowNull: false })
   name!: string;

   @Column(DataType.TEXT)
   description!: string;

   @Column(DataType.STRING)
   vehicle!: string;

   @Column({ type: DataType.DECIMAL(2, 1), allowNull: false })
   rating!: number;

   @Column(DataType.TEXT)
   review!: string;

   @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
   price_per_km!: number;
}
