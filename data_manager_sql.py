from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import database_common_sql


@database_common_sql.connection_handler
def get_boards(cursor: RealDictCursor):
    query = """
            SELECT *
            FROM boards
            ORDER BY id;
            """

    cursor.execute(query)
    boards = cursor.fetchall()
    return boards

@database_common_sql.connection_handler
def get_cards(cursor: RealDictCursor, board_id):
    query = """
            SELECT *
            FROM cards
            WHERE board_id = %(board_id)s
            ORDER BY id;
            """

    cursor.execute(query, {'board_id': board_id})
    cards = cursor.fetchall()

    return cards

@database_common_sql.connection_handler
def get_statuses(cursor: RealDictCursor):
    query = """
            SELECT *
            FROM statuses
            ORDER BY id;
            """

    cursor.execute(query)
    statuses = cursor.fetchall()
    return statuses

@database_common_sql.connection_handler
def get_cards_from_board(cursor: RealDictCursor, board_id):
    query = """
            SELECT *
            FROM cards
            WHERE cards.board_id = %(board_id)s
            ORDER BY id;
            """

    cursor.execute(query, {'board_id': board_id})
    return cursor.fetchall()

# new things

@database_common_sql.connection_handler
def add_new_board(cursor: RealDictCursor, new_board_title):
    query = """
            INSERT INTO boards(title) 
            VALUES (%(new_board_title)s)
            returning id, title;
            """

    cursor.execute(query, {'new_board_title': new_board_title})
    new_board_id = cursor.fetchall()
    return new_board_id

@database_common_sql.connection_handler
def add_new_card(cursor:RealDictCursor, new_card_title):
    query = """
            INSERT INTO cards(title)
            VALUES (%(new_card_title)s)
            returning id, title;
            """

    cursor.execute(query, {'new_card_title': new_card_title})
    new_card_id = cursor.fetchall()
    return new_card_id

            




# def get_cards_for_board(board_id):
#     all_cards = data_manager_sql.get_cards()
#     matching_cards = []
#     # for card in all_cards:
#     #     if card['board_id'] == str(board_id):
#     #         card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
#     #         matching_cards.append(card)
#     return all_cards
