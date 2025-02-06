"""empty message

Revision ID: 80094b5573e7
Revises: 738eda9e5e54
Create Date: 2025-02-06 14:45:14.364413

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '80094b5573e7'
down_revision = '738eda9e5e54'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('age', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_table', schema=None) as batch_op:
        batch_op.drop_column('age')

    # ### end Alembic commands ###
