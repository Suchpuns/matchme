from typing import Optional

import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db


class Event(db.Model):
    __tablename__ = "event"
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(120), index=True)
    roles: so.Mapped[list[dict]] = so.mapped_column(sa.JSON)
    preferences: so.WriteOnlyMapped["Preferences"] = so.relationship(
        back_populates="event", cascade="all,delete"
    )

    def __repr__(self):
        return "<Event {}>".format(self.name)


class Preferences(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(120), index=True)
    preference: so.Mapped[list[int]] = so.mapped_column(sa.JSON)
    event_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Event.id), index=True)
    event: so.Mapped[Event] = so.relationship(back_populates="preferences")

    def __repr__(self):
        return "<Person {}; Pref {}>".format(self.name, self.preference)
