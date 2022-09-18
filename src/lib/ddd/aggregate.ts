import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class Aggregate<T> {
  protected getClasses(): Function[] {
    return [this.constructor];
  }

  @Exclude()
  @CreateDateColumn()
  private createdAt!: Date;

  @Exclude()
  @Column()
  private createdBy!: string;

  @Exclude()
  @UpdateDateColumn()
  private updatedAt!: Date;

  @Exclude()
  @Column()
  private updatedBy!: string;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }
}
