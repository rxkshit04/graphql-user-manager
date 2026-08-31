import graphene

from .queries import Query
from .mutations import Mutation


class MyQuery(Query, graphene.ObjectType):
    pass


schema = graphene.Schema(
    query=MyQuery,
    mutation=Mutation,
)