export type GameCore = {
  "version": "0.1.0",
  "name": "game_core",
  "instructions": [
    {
      "name": "signUpPlayer",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_vault"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "playerPalace",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_palace"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "playerMerchant",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_merchant"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "purchaseMerchantItem",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "playerMerchant",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_merchant"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_vault"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "item",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "upgradePlayerPalace",
      "accounts": [
        {
          "name": "playerPalace",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_palace"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTokenMint",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectPalaceTokens",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_vault"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "playerPalace",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_palace"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectPlayerResources",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "experience",
            "type": "u64"
          },
          {
            "name": "gold",
            "type": "u64"
          },
          {
            "name": "lumber",
            "type": "u64"
          },
          {
            "name": "miners",
            "type": "u64"
          },
          {
            "name": "lumberjacks",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "playerPalace",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "level",
            "type": "u32"
          },
          {
            "name": "lastMintTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "playerMerchant",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "level",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MerchantItemNotFound",
      "msg": "Merchant item not found"
    },
    {
      "code": 6001,
      "name": "NotEnoughGold",
      "msg": "Not enough gold"
    },
    {
      "code": 6002,
      "name": "NotEnoughLumber",
      "msg": "Not enough lumber"
    },
    {
      "code": 6003,
      "name": "CouldNotBurnTokens",
      "msg": "Could not burn tokens"
    }
  ]
};

export const IDL: GameCore = {
  "version": "0.1.0",
  "name": "game_core",
  "instructions": [
    {
      "name": "signUpPlayer",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_vault"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "playerPalace",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_palace"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "playerMerchant",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_merchant"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "purchaseMerchantItem",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "playerMerchant",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_merchant"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_vault"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "item",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "upgradePlayerPalace",
      "accounts": [
        {
          "name": "playerPalace",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_palace"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTokenMint",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectPalaceTokens",
      "accounts": [
        {
          "name": "owner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              }
            ]
          }
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_vault"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "playerPalace",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player_palace"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectPlayerResources",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "player"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "experience",
            "type": "u64"
          },
          {
            "name": "gold",
            "type": "u64"
          },
          {
            "name": "lumber",
            "type": "u64"
          },
          {
            "name": "miners",
            "type": "u64"
          },
          {
            "name": "lumberjacks",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "playerPalace",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "level",
            "type": "u32"
          },
          {
            "name": "lastMintTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "playerMerchant",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "level",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MerchantItemNotFound",
      "msg": "Merchant item not found"
    },
    {
      "code": 6001,
      "name": "NotEnoughGold",
      "msg": "Not enough gold"
    },
    {
      "code": 6002,
      "name": "NotEnoughLumber",
      "msg": "Not enough lumber"
    },
    {
      "code": 6003,
      "name": "CouldNotBurnTokens",
      "msg": "Could not burn tokens"
    }
  ]
};
