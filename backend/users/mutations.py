import graphene
from datetime import datetime
from bson import ObjectId

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


class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        role = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, id, name, email, role):
        result = users_collection.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "name": name,
                    "email": email,
                    "role": role,
                }
            },
        )

        if result.matched_count == 0:
            raise Exception("User not found")

        user = users_collection.find_one({"_id": ObjectId(id)})

        return UpdateUser(
            user=UserType(
                id=str(user["_id"]),
                name=user["name"],
                email=user["email"],
                role=user["role"],
                created_at=user["created_at"].isoformat(),
            )
        )


class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        result = users_collection.delete_one(
            {"_id": ObjectId(id)}
        )

        if result.deleted_count == 0:
            raise Exception("User not found")

        return DeleteUser(success=True)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()