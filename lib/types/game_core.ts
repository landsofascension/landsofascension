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
                "kind": "arg",
                "type": "string",
                "path": "username"
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "purchaseMerchantItem",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
          "name": "player",
          "isMut": true,
          "isSigner": false
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
                "account": "Player",
                "path": "player"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
          "name": "player",
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "collectPlayerResources",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
            "name": "username",
            "type": "string"
          },
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
          },
          {
            "name": "lastResourcesTimestamp",
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
            "type": "u64"
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
    },
    {
      "code": 6004,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6005,
      "name": "NoResourcesToCollect",
      "msg": "No resources to collect"
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
                "kind": "arg",
                "type": "string",
                "path": "username"
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
      "args": [
        {
          "name": "username",
          "type": "string"
        }
      ]
    },
    {
      "name": "purchaseMerchantItem",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
          "name": "player",
          "isMut": true,
          "isSigner": false
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
                "account": "Player",
                "path": "player"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
          "name": "player",
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
                "account": "Player",
                "path": "player"
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
                "account": "Player",
                "path": "player"
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
          "name": "signer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "collectPlayerResources",
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
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
            "name": "username",
            "type": "string"
          },
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
          },
          {
            "name": "lastResourcesTimestamp",
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
            "type": "u64"
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
    },
    {
      "code": 6004,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6005,
      "name": "NoResourcesToCollect",
      "msg": "No resources to collect"
    }
  ]
};
