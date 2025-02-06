"""empty message

Revision ID: 738eda9e5e54
Revises: 
Create Date: 2025-02-06 14:03:59.446897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '738eda9e5e54'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pet_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('animal_type', sa.String(length=50), nullable=True),
    sa.Column('breed', sa.String(length=50), nullable=True),
    sa.Column('img_url', sa.String(length=50), nullable=True),
    sa.Column('adoption_status', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('password_hash', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('admin_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], name=op.f('fk_admin_table_user_id_user_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorite_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('pet_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['pet_id'], ['pet_table.id'], name=op.f('fk_favorite_table_pet_id_pet_table')),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], name=op.f('fk_favorite_table_user_id_user_table')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorite_table')
    op.drop_table('admin_table')
    op.drop_table('user_table')
    op.drop_table('pet_table')
    # ### end Alembic commands ###
