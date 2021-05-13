from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, index=True)
    email = Column(String, index=True)
