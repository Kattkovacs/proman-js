import persistence
import data_manager_sql


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = data_manager_sql.get_statuses()
    # return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')
    return statuses


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager_sql.get_boards()


def get_cards_for_board(board_id):
    all_cards = data_manager_sql.get_cards(board_id)
    matching_cards = []
    # for card in all_cards:
    #     if card['board_id'] == str(board_id):
    #         card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
    #         matching_cards.append(card)
    return all_cards

#new things

def saving_new_board():
    new_board = data_manager_sql.add_new_board()
    return new_board
