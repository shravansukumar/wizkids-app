import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, AfterLoad, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false})
    username: string;

    @Column({nullable:false})
    role: string;

    @Column({nullable: false})
    email: string;

    @Column()
    phoneNumber: string;

    @Column({ select: false })
    password: string;

    @Column({ default: false })
    isFired: boolean;

    @Column({ type: 'timestamp', nullable: true })
    firedAt: Date | null;

    private previousIsFired: boolean;

    @AfterLoad()
    loadPreviousState() {
        this.previousIsFired = this.isFired;
    }

    @BeforeInsert()
    setFiredAtOnInsert() {
        if (this.isFired) {
            this.firedAt = new Date();
        }
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,10)
    }

    @BeforeUpdate()
    setFiredAtOnUpdate() {
        // false to true
        if (!this.previousIsFired && this.isFired) {
            this.firedAt = new Date();
        }

        // true to false 
        if (this.previousIsFired && !this.isFired) {
            this.firedAt = null;
        }
    }
}