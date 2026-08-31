import graphene
from bson import ObjectId
from datetime import datetime

from .database import users_collection
from .queries import UserType


class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        role = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, name, email, role):
        user = {
            "name": name,
            "email": email,
            "role": role,
            "created_at": datetime.utcnow(),
        }

        result = users_collection.insert_one(user)
        user["_id"] = result.inserted_id

        return CreateUser(
            user=UserType(
                id=str(user["_id"]),
                name=user["name"],
                email=user["email"],
                role=user["role"],
                created_at=user["created_at"].isoformat(),
            )
        )


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()