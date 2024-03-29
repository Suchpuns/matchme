"""empty message

Revision ID: 0f92a3b28ed7
Revises: 
Create Date: 2024-03-02 15:20:24.773249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0f92a3b28ed7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('roles', sa.JSON(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_event_name'), ['name'], unique=False)

    op.create_table('preferences',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('preference', sa.JSON(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('preferences', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_preferences_event_id'), ['event_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_preferences_name'), ['name'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('preferences', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_preferences_name'))
        batch_op.drop_index(batch_op.f('ix_preferences_event_id'))

    op.drop_table('preferences')
    with op.batch_alter_table('event', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_event_name'))

    op.drop_table('event')
    # ### end Alembic commands ###
