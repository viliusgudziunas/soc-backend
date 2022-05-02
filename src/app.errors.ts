import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const formatAppError = (error: GraphQLError): GraphQLFormattedError => {
  const { message, path } = error;
  const formattedError: GraphQLFormattedError = { message, path };
  return formattedError;
};
